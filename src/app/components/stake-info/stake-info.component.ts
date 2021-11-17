import { Component, Input, OnInit } from '@angular/core';
import { StakingData } from 'src/app/classes/staking-data.class';

@Component({
  selector: 'app-stake-info',
  templateUrl: './stake-info.component.html',
  styleUrls: ['./stake-info.component.scss']
})
export class StakeInfoComponent implements OnInit {

  @Input() stakingData!: StakingData;

  projectionColumns: string[] = [ 'period','reward','percent','current','500','900','1000','2000','5000'];
  avgColumns: string[] = ['label','movr', 'usd', 'hrs', 'days', 'hrsNext', 'daysNext'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
