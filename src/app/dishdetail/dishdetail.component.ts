import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;

  formErrors = {
    'author' : '',
    'rating' : '',
    'comment' : ''
  };

  validationMessages = {
    'author' : {
      'required' : 'Name of the author is required.',
      'minLength' : 'The name should be atleast 2 characters long'
    }
  };

  constructor(private dishService: DishService,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
        this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
        this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(+params['id'])))
        .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: '5',
      comment: ['', [ Validators.required ] ]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }


  onValueChanged(commentFormData?: any) {
    if(!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  OnSubmit() {
    this.comment['date'] = new Date().toISOString();
    this.dish.comments.push(this.comment);
    this.commentForm.reset({
        author: '',
        rating: 5,
        comment: ''
    });
  }

}
