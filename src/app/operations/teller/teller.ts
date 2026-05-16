import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teller.html',
  styles: []
})
export class TellerComponent implements OnInit, OnDestroy {
  tellerQueue = signal<any[]>([
    { token: 'A-104', service: 'Cash Deposit', status: 'serving', waitTime: '2 mins' },
    { token: 'B-201', service: 'Check Encashment', status: 'waiting', waitTime: '15 mins' },
    { token: 'C-305', service: 'Account Inquiry', status: 'waiting', waitTime: '20 mins' }
  ]);

  currentNumber = signal('A-104');
  private interval: any;

  ngOnInit() {
    // Simulate real-time queue updates
    this.interval = setInterval(() => {
      this.updateQueue();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  updateQueue() {
    const queue = this.tellerQueue();
    if (queue.length > 1) {
      const next = queue.find(q => q.status === 'waiting');
      if (next) {
        this.currentNumber.set(next.token);
        this.tellerQueue.update(q => q.map(item => {
          if (item.token === next.token) return { ...item, status: 'serving', waitTime: '0 mins' };
          if (item.token === this.currentNumber()) return { ...item, status: 'completed' };
          return item;
        }).filter(item => item.status !== 'completed'));
        
        // Add a new random person to the queue
        const newToken = 'T-' + Math.floor(Math.random() * 900 + 100);
        this.tellerQueue.update(q => [...q, { token: newToken, service: 'General Service', status: 'waiting', waitTime: '25 mins' }]);
      }
    }
  }

  callNext() {
    this.updateQueue();
  }
}
