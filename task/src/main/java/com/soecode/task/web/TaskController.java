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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
	private List<Task> list() {
		List<Task> list = taskDao.getTaskList(0);
        return list;
	}

	@RequestMapping(value = "/createTask", method = RequestMethod.GET)
	@ResponseBody
	private int addTask(@RequestParam("userId") String userId,@RequestParam("title") String title,@RequestParam("introduce") String introduce,
	@RequestParam("publishTime") String publishTime,@RequestParam("endDate") String endDate,@RequestParam("endTime") String endTime,
	@RequestParam("money") double money,@RequestParam("latitude") double latitude,@RequestParam("longitude") double longitude) {
		String id=UUID.randomUUID().toString().replaceAll("-", "");
	    int flag=taskDao.createTask(id,userId,title,introduce,publishTime,endDate,endTime,money,0,latitude,longitude,0);
		return flag;
	}

	@RequestMapping(value = "/publishTask", method = RequestMethod.GET)
	@ResponseBody
	private List<Task> publishTask(@RequestParam("userId")String userId){
		List<Task> list=taskDao.publishTask(userId);
		return list;
	}

    @RequestMapping(value = "/cancelTask", method = RequestMethod.GET)
    @ResponseBody
    private int cancelTask(@RequestParam("id") String id){
        int flag=taskDao.cancelTask(id);
        return flag;
    }

	@RequestMapping(value = "/addAcceptTask", method = RequestMethod.GET)
	@ResponseBody
	private int addAccetptTask(@RequestParam("taskId") String taskId,@RequestParam("userId") String userId){
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date date=new Date();
		String acceptTime=df.format(date);
		int flag=taskDao.addAcceptTask(taskId,userId,acceptTime,0);
		int flag1=taskDao.modifyStatus(taskId,3);
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
            list1.add(t);
        }
        return list1;
	}
}
