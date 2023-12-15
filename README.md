pm2 monit --monitorear
pm2 start src/server.js --name mi_aplicacion --max-restarts 5 --env production -- para iniciar
pm2 stop  mi_aplicacion  -- para parar
pmw delete mi_aplicacion -- eliminar
pm2 logs mi_aplicacion --logs