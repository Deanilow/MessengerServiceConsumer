@echo off

REM Configuración del servicio
set SERVICE_NAME=SSDEMO2
set NODE_EXE=C:\Program Files\nodejs\node.exe
set SCRIPT_PATH=C:\DD\Proyectos\GitLab_Dangamesd\api_bot_wsp\RabbitMQ-wsp\src\int.js

REM Ruta a NSSM (debe estar en el mismo directorio que este script)
set NSSM_PATH=C:\Users\D4nil\Downloads\nssm-2.24\win64\nssm.exe

REM Comprueba si NSSM está presente
if not exist "%NSSM_PATH%" (
  echo Error: NSSM no encontrado en el directorio del script.
  echo Por favor, asegúrate de que NSSM está presente en el mismo directorio que este script.
  pause
  exit /b 1
)

REM Instalar el servicio
"%NSSM_PATH%" install %SERVICE_NAME% %NODE_EXE% %SCRIPT_PATH%

REM Iniciar el servicio
"%NSSM_PATH%" start %SERVICE_NAME%

echo.
echo El servicio %SERVICE_NAME% ha sido instalado y está en funcionamiento.
echo Puedes gestionar el servicio con los comandos: start y stop
echo.

REM Pausa para que puedas ver los mensajes antes de que se cierre la ventana
pause
