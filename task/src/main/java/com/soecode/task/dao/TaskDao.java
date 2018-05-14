package com.soecode.task.dao;


import com.soecode.task.entity.AcceptTask;
import com.soecode.task.entity.Task;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface TaskDao {

	/**
	 * 获取任务
	 * @param keyword
	 */
	List<Task> getTaskList(int status,String userId,@Param("keyword") String keyword);

    /**
     *  创建任务
     */
    int createTask(String id,String userId,String title,String introduce ,String publishTime,String endDate,
             String endTime,double money,int status,double latitude,double longitude,double dis);

	/**
	 * 查看已接受的任务（完成的和未完成的）
     *
	 */
	List<Task> publishTask(String userId);

    /**
     * 改变任务状态
     *
     */
    int changeTaskStatus(String taskId,int status);

	/**
	 *	接受任务
     *
	 */
	int addAcceptTask(String taskId,String userId,String acceptTime,int Status);


	/**
	 * 获取用户接受的任务
     *
	 */
	List<AcceptTask> getAcceptTask(String userId);

	/**
	 * 通过id查找任务
     *
	 */
	Task getTask(String taskId);

	/**
	 * 更改接受的任务状态
     *
	 */
	int changeAcceptStatus(String userId,String taskId,String acceptTime,int status);

    /**
     * 根据taskId和status更改任务状态,用于确认完成
     *
     */
    int changeAcceptStatus2(String taskId,int setStatus,int nowStatus);
}
