@echo off

REM Obtener la ruta del script actual
set "scriptPath=%~dp0"

REM Construir la ruta del archivo .env
set "envFilePath=%scriptPath%.env"

REM Leer el valor de "NODE_ENV" del archivo .env
for /f "tokens=2 delims==," %%c in ('type "%envFilePath%" ^| find /i "NODE_ENV"') do set "environment=%%~c"
set "environment=%environment:"=%"
set "environment=%environment: =%"

REM Determinar qué archivo .env utilizar basándose en NODE_ENV
set "envFileName=.env.development"
if /i "%environment%"=="production" (
  set "envFileName=.env.production"
)

REM Construir la ruta del archivo .env específico
set "envFilePath=%scriptPath%%envFileName%"

REM Leer el valor de "DEFAULT_NAME_WORKER" del archivo .env
for /f "tokens=2 delims==," %%a in ('type "%envFilePath%" ^| find /i "DEFAULT_NAME_WORKER"') do set "name=%%~a"
set "name=%name:"=%"
set "name=%name: =%"

REM Detener y eliminar el servicio si está en ejecución
pm2 delete "%name%"

REM Verificar si el archivo JSON existe y eliminarlo si es el caso
if exist "%scriptPath%%name%.json" (
  del "%scriptPath%%name%.json"
  echo Archivo JSON existente eliminado.
)

echo Desinstalación completada exitosamente.

REM Esperar 2 segundos
timeout /t 2 /nobreak > NUL
