require('dotenv').config()

const {leerInput, pausa, inquirerMenu, listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do{
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const termino = await leerInput('Ciudad:')
                const lugares = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);
                if (id === '0') continue;

                const lugarSel = lugares.find( l => l.id === id ); 
                busquedas.agregarHistorial( lugarSel.nombre );

                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)

                console.clear();
                console.log('\n Información de la ciudad \n'.green);
                console.log('Ciudad:', lugarSel.nombre );
                console.log('Lat:', lugarSel.lat);
                console.log('Long:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínimo:', clima.min);
                console.log('Máximo:', clima.max);
                console.log('Descripción:', clima.desc);

            break;
            
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${idx} ${lugar}`);
                })
            break;
            
        }

        if ( opt !== 0 ) await pausa();

    } while (opt !== 0)
}

main();