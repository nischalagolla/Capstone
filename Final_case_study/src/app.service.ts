
import { Injectable } from '@nestjs/common';
import  cluster from 'cluster';
import  os from 'os';

const numCPUs = os.cpus().length;

@Injectable()
export class AppClusterService {
  static clusterize(callback: Function): void {
     //load balancer 

  if (cluster.isPrimary ) {
    console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);

    for (let i = 0; i < numCPUs; i++) {
      console.log("starting new child process");
      cluster.fork();
    }
  }
  else{
    console.log(` WORKER SERVER (${process.pid}) IS RUNNING `);
    callback();
  }

  cluster.on("exit",()=>{
    console.log("child process killed");
    cluster.fork();
    console.log("new child process created");
  })
}
}