#!/bin/bash

echo "🚀 Instalando EnergíaFina S.A. - Sistema de Optimización"
echo "=================================================="

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 16 o superior."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm."
    exit 1
fi

echo "✅ Node.js y npm encontrados"

# Instalar dependencias del proyecto principal
echo "📦 Instalando dependencias del proyecto principal..."
npm install

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd backend
npm install

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env para el backend..."
    cp env.example .env
    echo "⚠️  Por favor configura las variables de entorno en backend/.env"
fi

cd ..

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Instalación completada exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura las variables de entorno en backend/.env"
echo "2. Ejecuta 'npm run dev' para iniciar el desarrollo"
echo "3. Accede a http://localhost:3000 para el frontend"
echo "4. Accede a http://localhost:3001/api para la documentación de la API"
echo ""
echo "🔧 Comandos disponibles:"
echo "  npm run dev          - Iniciar desarrollo (backend + frontend)"
echo "  npm run dev:backend  - Solo backend"
echo "  npm run dev:frontend - Solo frontend"
echo "  npm run build        - Construir para producción"
echo "" 