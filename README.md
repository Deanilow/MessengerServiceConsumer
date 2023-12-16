pm2 monit --monitorear
pm2 start src/server.js --name mi_aplicacion --max-restarts 5 --env production -- para iniciar
pm2 stop  mi_aplicacion  -- para parar
pmw delete mi_aplicacion -- eliminar
pm2 logs mi_aplicacion --logs
pm2 restart 


{
  "apps": [
    {
      /* General */
      "name": "my-api", /* (string) application name (default to script filename without extension) */
      "script": "index.js", /* (string) script path relative to pm2 start */
      "cwd": "/var/www/", /* (string) the directory from which your app will be launched */
      "args": "-a 13 -b 12", /* (string) string containing all arguments passed via CLI to script */
      "interpreter": "/usr/bin/python", /* (string) interpreter absolute path (default to node) */
      "interpreter_args": "--harmony", /* (string) option to pass to the interpreter */
      //"node_args": "", /* (string) alias to interpreter_args  */
      "exec_interpreter": "node",
    
      /* Advanced features */
      "instances": 1, /* number of app instance to be launched */
      "exec_mode": "fork", /* (string) mode to start your app, can be “cluster” or “fork”, default fork */
      "watch": true, /* (boolean or []) enable watch & restart feature, if a file change in the folder or subfolder, your app will get reloaded */
      "ignore_watch": [], /* (list) list of regex to ignore some file or folder names by the watch feature */
      "max_memory_restart": "150M", /* (string) your app will be restarted if it exceeds the amount of memory specified. human-friendly format : it can be “10M”, “100K”, “2G” and so on… */
      "env": {"NODE_ENV": "development", "ID": 42}, /* (object) env variables which will appear in your app */
      "env_production": {"NODE_ENV": "production", "ID": 89}, /* (object) inject when doing pm2 restart ecosystem.json --env */
      "source_map_support": true, /* (boolean) default to true, [enable/disable source map file] */
      "instance_var": "NODE_APP_INSTANCE", /* (string) see documentation http://pm2.keymetrics.io/docs/usage/environment/#specific-environment-variables */
      "treekill": true, /* (bool) default to true  Kill children process */
    
      /* Log files */
      "log_date_format": "YYYY-MM-DD HH:mm Z", /* (string) log date format */
      //"error_file": "", /* (string) error file path (default to $HOME/.pm2/logs/XXXerr.log) */
      //"out_file": "", /* (string) output file path (default to $HOME/.pm2/logs/XXXout.log) */
      "combine_logs": true, /* (boolean) if set to true, avoid to suffix logs file with the process id */
      //"merge_logs": "", /* (boolean) alias to combine_logs*/
      //"pid_file": "", /* (string) pid file path (default to $HOME/.pm2/pid/app-pm_id.pid) */
      "log_type": "json", /* none documented function */
    
    
      /* Control flow */
      "min_uptime": 5000, /* (string) min uptime of the app to be considered started */
      "listen_timeout": 100000, /* (number) time in ms before forcing a reload if app not listening  */
      "kill_timeout": 5000, /* (number) time in milliseconds before sending a final SIGKILL */
      "wait_ready": false, /* (boolean) Instead of reload waiting for listen event, wait for process.send(‘ready’) */
      "max_restarts": 5, /* number of consecutive unstable restarts (less than 1sec interval or custom time via min_uptime) before your app is considered errored and stop being restarted */
      "restart_delay":4000, /* (number) time to wait before restarting a crashed app (in milliseconds). defaults to 0. */
      "autorestart": true, /* (boolean) true by default. if false, PM2 will not restart your app if it crashes or ends peacefully */
      "cron_restart": "1 0 * * *", /* (string) a cron pattern to restart your app. Application must be running for cron feature to work */
      "vizion": false, /* (boolean) true by default. if false, PM2 will start without vizion features (versioning control metadatas) */
      "post_update": ["npm install", "echo launching the app"], /* (list) a list of commands which will be executed after you perform a Pull/Upgrade operation from Keymetrics dashboard */
      "force": false /* (boolean) defaults to false. if true, you can start the same script several times which is usually not allowed by PM2 */
    }
  ]
}
