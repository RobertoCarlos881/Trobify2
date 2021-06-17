
create database trobify;
use trobify;

create table inmueble (
    id INT(100) not null,
    nombre varchar(100),
    tipo_compra VARCHAR(30),
    ubicacion varchar(150),
    latitud VARCHAR(30),
    longitud VARCHAR(30),
    precio INTEGER,
    imagenes VARCHAR(1000),
    recamaras_no INTEGER
);

 alter table inmueble
    add primary key(id);
ALTER TABLE inmueble
    MODIFY id INT(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
   
    insert into inmueble (nombre, tipo_compra, ubicacion, latitud, longitud, precio, imagenes, recamaras_no) values(
        'La casa del chuz',
        'venta',
        'Metro Poli',
        '56.065998921372184',
        '64.49023058453719',
        1000000,
        'prueba',
        1
    );

// 19.370331318415076, -99.22294633094319
// 19.62107608561512, -100.19700198940133

create table historicos(
    id_historicos INTEGER,
    codigo_in INTEGER,
    fecha DATE,
    visita INTEGER,
    oferta INTEGER,
    no_oferta INTEGER,
    no_visita INTEGER,
    
    FOREIGN key(codigo_in) 
    REFERENCES inmueble(codigo_inmueble)
    on delete cascade,
    PRIMARY KEY(id_historicos, codigo_in)
);

CREATE table usuario(
    Nombre VARCHAR(100),
    sexo VARCHAR(9) default "otro",
    correoE VARCHAR(50),
    pass varbinary(100) not null,
    fechaNac DATE,
    tipoUsuario VARCHAR(20) default "normal",

    PRIMARY KEY(Nombre)
);

/*para modificar el nombre de usuario*/

alter table usuario
add primary key(curp_usuario);

/*cambiar algun campo en la DB*/
ALTER TABLE usuario change curp_usaurio curp_usuario VARCHAR(18);

create table favorito(
    estado VARCHAR(30),
    fecha DATE,
    fav_id INTEGER not null,
    correo_u VARCHAR(50) not null,
    
    PRIMARY KEY(correo_u, fav_id),
    FOREIGN KEY(correo_u) 
    REFERENCES usuario(Nombre)
    ON DELETE CASCADE
);

create table estadisticas(
    correo_u1 VARCHAR(50),
    ventas_agendadas INTEGER,
    ventas_cocretadas INTEGER,
    ofertas INTEGER,
    vistas_con INTEGER,
    no_visitas INTEGER,

    PRIMARY KEY(correo_u1),
    FOREIGN key (correo_u1)
    REFERENCES usuario(Nombre)
    on DELETE CASCADE 
);

create table administrador(
    cod_inm INTEGER not null,
    correoU VARCHAR(50),

    PRIMARY KEY(cod_inm),

    FOREIGN KEY(cod_inm)
    REFERENCES inmueble(codigo_inmueble)
    on DELETE CASCADE,

    FOREIGN KEY(correoU)
    REFERENCES usuario(Nombre)
    on DELETE CASCADE
);

create TABLE agenda(
    id_agenda integer not null,
    nota VARCHAR(200),
    fecha date,

    PRIMARY KEY(id_agenda)
);

create table sagenda(
    correo_u2 VARCHAR(18),
    id_agenda1 INTEGER not null,

    PRIMARY KEY (id_agenda1, correo_u2),

    FOREIGN KEY(id_agenda1)
    REFERENCES agenda(id_agenda)
    on DELETE CASCADE,
    
    FOREIGN KEY(correo_u2)
    REFERENCES usuario(Nombre)
    on DELETE CASCADE
);


insert into inmueble values(
    000000,
    'Inmueble rustico de descanso',
    500,
    '',
    '',
    4500,
    '',
    5,
    'inmediata',
    'disponible'
);