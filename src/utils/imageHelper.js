/**
 * Procesa la imagen base64 del estudiante
 * @param {string} base64String - String base64 desde la API
 * @returns {string|null} - Data URI completa o null
 */
export const processStudentPhoto = (base64String) => {
  if (!base64String) return null

  // Si ya tiene el prefijo data:image, retornar tal cual
  if (base64String.startsWith('data:image')) {
    return base64String
  }

  // Si es base64 puro, agregar el prefijo
  // La API devuelve JPG según el header /9j/4AAQ...
  const cleanBase64 = base64String.replace(/\n/g, '').trim()
  return `data:image/jpeg;base64,${cleanBase64}`
}

/**
 * Obtiene las iniciales de un nombre
 * @param {string} fullName - Nombre completo
 * @returns {string} - Iniciales
 */
export const getInitials = (fullName) => {
  if (!fullName) return '??'
  const words = fullName.trim().split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return fullName.substring(0, 2).toUpperCase()
}

/**
 * Obtiene el primer nombre
 * @param {string} fullName - Nombre completo
 * @returns {string} - Primer nombre
 */
export const getFirstName = (fullName) => {
  if (!fullName) return ''
  return fullName.split(' ')[0]
}