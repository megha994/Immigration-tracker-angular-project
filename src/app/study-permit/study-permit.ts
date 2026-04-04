import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-study-permit',
  standalone: false,
  templateUrl: './study-permit.html',
  styleUrls: ['./study-permit.css'],
})
export class StudyPermit {
  selectedOption = new FormControl('express');
  
  radioOptions = [
    'Outside Canada',
    'Within Canada', 
    'At Port of Entry'
  ];
}