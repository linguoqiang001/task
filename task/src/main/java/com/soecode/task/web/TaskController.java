package com.soecode.task.web;

import com.soecode.task.dao.TaskDao;
import com.soecode.task.dto.AppointExecution;
import com.soecode.task.dto.Result;
import com.soecode.task.entity.AcceptTask;
import com.soecode.task.entity.Book;
import com.soecode.task.entity.Task;
import com.soecode.task.enums.AppointStateEnum;
import com.soecode.task.exception.NoNumberException;
import com.soecode.task.exception.RepeatAppointException;
import com.soecode.task.service.BookService;
import com.soecode.task.util.HttpRequest;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.RequestWrapper;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("") // url:/模块/资源/{id}/细分 /seckill/list
public class TaskController {
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private TaskDao taskDao;

	@RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
	private List<Task> list(@RequestParam("userId")String userId,@RequestParam("keyword") String keyword) {
		List<Task> list = taskDao.getTaskList(0,userId,	keyword);
        return list;
	}

	@RequestMapping(value = "/createTask", method = RequestMethod.GET)
	@ResponseBody
	private int addTask(@RequestParam("userId") String userId,@RequestParam("title") String title,@RequestParam("introduce") String introduce,
	@RequestParam("publishTime") String publishTime,@RequestParam("endDate") String endDate,@RequestParam("endTime") String endTime,
	@RequestParam("money") double money,@RequestParam("latitude") double latitude,@RequestParam("longitude") double longitude) {
		String id=UUID.randomUUID().toString().replaceAll("-", "");
		return  taskDao.createTask(id,userId,title,introduce,publishTime,endDate,endTime,money,0,latitude,longitude,0);
	}

	@RequestMapping(value = "/publishTask", method = RequestMethod.GET)
	@ResponseBody
	private List<Task> publishTask(@RequestParam("userId")String userId){
		List<Task> list=taskDao.publishTask(userId);
		return list;
	}

    @RequestMapping(value = "/changeTaskStatus", method = RequestMethod.GET)
    @ResponseBody
    private int changeTaskStatus(@RequestParam("taskId") String taskId,@RequestParam("status") int status){
        return taskDao.changeTaskStatus(taskId,status);
    }

	@RequestMapping(value = "/addAcceptTask", method = RequestMethod.GET)
	@ResponseBody
	private int addAccetptTask(@RequestParam("taskId") String taskId,@RequestParam("userId") String userId){
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date date=new Date();
		String acceptTime=df.format(date);
		int flag=taskDao.addAcceptTask(taskId,userId,acceptTime,0);
		int flag1=taskDao.changeTaskStatus(taskId,2);
		return flag&flag1;
	}

    @RequestMapping(value = "/getAcceptTask", method = RequestMethod.GET)
    @ResponseBody
    private List<Task> getAcceptTask(@RequestParam("userId") String userId){
        List<AcceptTask> list=taskDao.getAcceptTask(userId);
        List<Task> list1=new ArrayList<Task>();
        for (AcceptTask a:list ) {
            String taskId=a.getTaskId();
            Task t=taskDao.getTask(taskId);
            t.setStatus(a.getStatus());
            t.setPublishTime(a.getAcceptTime());
            t.setUserId(a.getUserId());
            list1.add(t);
        }
        return list1;
	}

	@RequestMapping(value = "/changeAcceptStatus", method = RequestMethod.GET)
	@ResponseBody
	private int changeAcceptStatus(@RequestParam("userId") String userId, @RequestParam("taskId") String taskId,
	@RequestParam("acceptTime") String acceptTime,@RequestParam("status") int status){
		return  taskDao.changeAcceptStatus(userId,taskId,acceptTime,status);
	}

    @RequestMapping(value = "/confirmTask", method = RequestMethod.GET)
    @ResponseBody
	private int confirmTask(@RequestParam("taskId") String taskId,@RequestParam("setStatus") int setStatus,@RequestParam("nowStatus") int nowStatus){
	    return  taskDao.changeAcceptStatus2(taskId,setStatus,nowStatus);
    }

	@RequestMapping(value = "/getOpenId", method = RequestMethod.GET)
	@ResponseBody
	private String getOpenId(@RequestParam ("code") String code){
        return HttpRequest.sendGet("https://api.weixin.qq.com/sns/jscode2session?" +
                "appid=wxa9a66cc68c4f6329&" + "secret=1eaafec7749607902afb8e531f013a37&" +
                "js_code="+ code +"&grant_type=authorization_code","");
    }
}
