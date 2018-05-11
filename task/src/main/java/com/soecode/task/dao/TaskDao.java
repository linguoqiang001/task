package com.soecode.task.dao;


import com.soecode.task.entity.AcceptTask;
import com.soecode.task.entity.Task;

import java.util.List;


public interface TaskDao {

	/**
	 * 获取任务
	 */
	List<Task> getTaskList(int status);

    /**
     *  创建任务
     */
    int createTask(String id,String userId,String title,String introduce ,String publishTime,String endDate,
             String endTime,double money,int status,double latitude,double longitude,double dis);

	/**
	 * 查看已接受的任务（完成的和未完成的）
	 */
	List<Task> publishTask(String userId);

	/**
	 * 取消任务
	 */
	int cancelTask(String id);

	/**
	 *	接受任务
	 */
	int addAcceptTask(String taskId,String userId,String acceptTime,int Status);

	/**
	 * 修改任务状态
	 */
	int modifyStatus(String taskId,int status);

	/**
	 * 获取用户接受的任务
	 */
	List<AcceptTask> getAcceptTask(String userId);

	/**
	 * 通过id查找任务
	 */
	Task getTask(String taskId);
}
