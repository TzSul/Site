@echo off
setlocal
title Clinica das Chaves - Instalador de Dependencias

echo ===============================================
echo    Clinica das Chaves - Setup de Dependencias
echo ===============================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Node.js nao encontrado.
  echo Instale em: https://nodejs.org/
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERRO] npm nao encontrado.
  echo Reinstale o Node.js para incluir o npm.
  pause
  exit /b 1
)

if not exist package.json (
  echo Criando package.json...
  call npm init -y
  if errorlevel 1 (
    echo [ERRO] Falha ao criar package.json.
    pause
    exit /b 1
  )
)

echo Instalando dependencia para servidor local...
call npm install --save-dev http-server
if errorlevel 1 (
  echo [ERRO] Falha ao instalar dependencia.
  pause
  exit /b 1
)

echo.
echo [OK] Dependencias instaladas com sucesso.
echo Iniciando servidor local em http://localhost:8080 ...
start "" http://localhost:8080
echo.
echo Site iniciado. Para parar o servidor, pressione CTRL + C nesta janela.
echo.
call npx http-server -p 8080 -c-1
endlocal
