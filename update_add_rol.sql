-- Script para agregar el campo 'rol' a la tabla usuarios existente
-- Ejecutar: mysql -u root -p store < update_add_rol.sql

USE store;

-- Agregar columna 'rol' si no existe
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS rol VARCHAR(20) DEFAULT 'user' AFTER password;

-- Crear índice para mejorar búsquedas por rol
ALTER TABLE users 
ADD INDEX IF NOT EXISTS idx_rol (rol);

-- Actualizar usuarios existentes para asignarles rol 'user' si es NULL
UPDATE users 
SET rol = 'user' 
WHERE rol IS NULL;

-- Actualizar el usuario admin si existe (por email)
UPDATE users 
SET rol = 'admin' 
WHERE email = 'admin@store.com';

-- Verificar los cambios
SELECT id, name, email, rol FROM users;

-- Mostrar resultado
SELECT 
    COUNT(*) as total_usuarios,
    SUM(CASE WHEN rol = 'admin' THEN 1 ELSE 0 END) as administradores,
    SUM(CASE WHEN rol = 'user' THEN 1 ELSE 0 END) as usuarios_normales
FROM users;
