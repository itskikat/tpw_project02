import {EventEmitter} from '@angular/core';

export class Emitters {
  static authEmitter = new EventEmitter<boolean>();
  static newCartItemEmitter = new EventEmitter<string>();
  static userEmitter = new EventEmitter<string>();
  static userEmitterId = new EventEmitter<number>();
  static accountEmitter = new EventEmitter<any>();
  static searchEmitter = new EventEmitter<string>();
}
