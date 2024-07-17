const toValidUrl = (name) => {
    // Convertir a minúsculas
    let lowerStr = name.toLowerCase();

    // Eliminar acentos y caracteres especiales usando la normalización Unicode
    let normalizedStr = lowerStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Reemplazar caracteres especiales con un espacio en blanco
    let cleanStr = normalizedStr.replace(/[^a-z0-9]+/g, '');
    return cleanStr;
}

export default toValidUrl;
