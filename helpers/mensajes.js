require('colors');

const mostrarMenu = () =>{
    return new Promise (resolve=> {
        console.clear();
        console.log('============================='.green);
        console.log('     Selecciona una opción'.rainbow    );
        console.log('=============================\n'.green);
    
        console.log(`${'1.'.green} Crear una tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tareas`);
        console.log(`${'6.'.green} Borrar tarea(s)`);
        console.log(`${'0.'.green} Salir\n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question('Selecciona una opción: ', (opt)=>{ //opt esel callback
            console.log(opt);
            readline.close(); //Cuando se utiliza readline, se debe cerrar
            resolve(opt);
        });
    });
}

const pausa = () =>{
    return new Promise (resolve=>{
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question(`\nPresione ${'ENTER'.red} para continuar\n`, (opt)=>{ 
            readline.close(); 
            resolve();
        });
    })
}


module.exports= {
    mostrarMenu,
    pausa
};