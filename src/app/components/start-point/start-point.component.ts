import { Component, OnInit } from '@angular/core';
import { StakingData } from 'src/app/classes/staking-data.class';
import { RestService } from 'src/app/core/rest.service';

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.scss']
})
export class StartPointComponent implements OnInit {

  constructor(private restSvc: RestService) { }

  address: string = "";
  stakingData: StakingData = new StakingData();
  fetchingData: boolean = false;

  ngOnInit(): void {
  }

  getInfo() {
    if(this.address !== "" && this.address.length >= 42) {
      this.fetchingData = true;
      this.stakingData = new StakingData();
      this.restSvc.info(this.address)
                  .subscribe(res => {
                    this.stakingData = res;
                    this.fetchingData = false;
                  });
    }
  }
}
