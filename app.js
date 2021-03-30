require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {inquirerMenu, pausa, leerInput, listadoTareaBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() =>{    
    let opt = '';

    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt= await inquirerMenu();
        
        switch(opt){
            case '1':
                //Crear tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2':
                //Listar tareas
                tareas.listadoCompleto();
                break;
            case '3':
                //Listar tareas completadas
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                //Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                //Completar tareas
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toogleCompletado(ids);
                break;
            case '6':
                //Borrar tareas
                const id = await listadoTareaBorrar(tareas.listadoArr);
                if(id!=0){
                    const ok = await confirmar('¿Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada exitosamente');
                    }
                }
                break;
        }

         guardarDB(tareas.listadoArr);

        await pausa();
    } while (opt !== '0');
    
}

main();