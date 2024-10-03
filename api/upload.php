<?php

function obtenerArchivo($nombreArchivo) {
    foreach ($_FILES['archivos']['name'] as $key => $nombre) {
        if ($nombre === $nombreArchivo) {
            return $_FILES['archivos']['tmp_name'][$key];
        }
    }
    return null; // Si no se encuentra el archivo
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['archivos'])) {
    // Obtener las rutas de los archivos desde el FormData
    $filePaths = json_decode($_POST['filePaths'], true);
    $database = $_POST['database'];
    
    $zip = new ZipArchive();
    $zipFileName = 'backend.zip';

    if ($zip->open($zipFileName, ZipArchive::CREATE) !== TRUE) {
        exit("No se puede abrir <$zipFileName>\n");
    }

//parcial/src/main/java/com/example/parcial/modelo/archivo.java
    foreach ($filePaths as $fileName => $filePath) {
		
        // Divide la ruta en partes usando "/"
        $dirs = explode("/", $filePath);

        // Ignora la primera y la última palabra del arreglo
        $subdirs = array_slice($dirs, 1, -1);
        
        $rutaActual = '';
        
        foreach ($subdirs as $subdir) {
            $rutaActual .= $subdir . '/';
            $zip->addEmptyDir($rutaActual);
        }

        
        
		
        $archivo = obtenerArchivo($fileName);
        if ($archivo !== null) {

            if($fileName==="application.properties"){//application.properties
                // Leer el contenido del archivo temporal
                $content = file_get_contents($archivo);
                
                // Agregar la cadena "hola mundo" al final del contenido
                $content .= "spring.datasource.url=jdbc:postgresql://localhost:5432/$database
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect";
                
                // Escribir el contenido modificado de nuevo en el archivo temporal
                file_put_contents($archivo, $content);
            }

            $zip->addFile($archivo, $rutaActual . $fileName);
        }
    }
    
    
    $zip->close();

    header('Content-Type: application/zip');
    header('Content-disposition: attachment; filename=' . $zipFileName);
    header('Content-Length: ' . filesize($zipFileName));
    readfile($zipFileName);

    // Eliminar el archivo ZIP después de la descarga
    unlink($zipFileName);
    exit;
	
}

?>