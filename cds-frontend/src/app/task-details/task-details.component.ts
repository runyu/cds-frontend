import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';

import { Editor, Toolbar } from 'ngx-editor';

import jsonDoc from './doc';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  id!: number
  task: Task = new Task();
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  editorDoc=jsonDoc;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.task = new Task();
    this.taskService.getTaskById(this.id).subscribe( data => {
      this.task = data;
    });
    
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
