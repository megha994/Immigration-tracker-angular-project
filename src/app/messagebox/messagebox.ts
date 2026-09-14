import { Component, input, OnInit, output, ChangeDetectionStrategy } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-messagebox',
  standalone: true,
  imports: [Dialog],
  templateUrl: './messagebox.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./messagebox.css'],
})
export class Messagebox implements OnInit {

  // Angular 21 input signals
  msg = input<string>();
  status = input<string>();
  visible = true;
  ngOnInit() {
    // You can safely read the values here
    console.log('Message:', this.msg());
    console.log('Status:', this.status());
  }

  closed = output<void>();
  onHide() {
    this.visible = false;
    this.closed.emit();      // 👈 notify parent
  }

  headerMessage = "Attention";
}
