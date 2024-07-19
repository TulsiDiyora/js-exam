let title = document.getElementById('title');
let desc = document.getElementById('description');
let due = document.getElementById('due');
let priority = document.getElementById('priority');

let tbody = document.getElementById('tbody');
let isEdit = false;
let isIndex;
let getData = () =>{
    let data = JSON.parse(localStorage.getItem('manager'))
    if(data){
        return data
    }
    else{
        return [];
    }
}
let storege = getData();
const addData = () => {

    event.preventDefault();

    let object = {
        id :  isIndex ? isIndex : Math.floor(Math.random() * 1000),
        title : title.value,
        desc : desc.value,
        due : due.value,
        priority : priority.value,
    }

    if(isEdit){
        let data = [...storege];

        let dataa = data.map((rec) => {

            if(rec.id == isIndex){
                return object;
            }
            else{
                return rec;
            }

        })

        console.log(dataa); 

        storege = dataa;
       

        isIndex = undefined;
        isEdit = false;
    }
   else{
       console.log(object);
       storege = [...storege,object];
       console.log(storege);
    
   }
    localStorage.setItem('manager',JSON.stringify(storege))

    title.value = '';
    desc.value = '';
    due.value = '';
    priority.value = '';

    display()
}

const update = (id) => {

    console.log("edit", id);
    
    let data = [...storege];

    let updataa = data.filter((da) => {
        return da.id == id
    })

    isIndex = id;
   isEdit = true;

    console.log(data);
    console.log(updataa[0]);


   title.value = updataa[0].title;
   desc.value = updataa[0].desc;
   due.value = updataa[0].due;
   priority.value = updataa[0].priority;
   
}
 const deleteData = (id) =>{
    let data = [...storege];

    let  deleteData = [...storege].filter((d) => {
        return d.id != id;
    })

    console.log("deleteData", deleteData);
    storege = deleteData;

    console.log(data);

    localStorage.setItem('manager',JSON.stringify(storege))

    display();
 }


const display = () => {

    tbody.innerHTML = '';
    storege.forEach((ele) => {
        tbody.innerHTML += `<tr>
             <th scope="row">${ele.id}</th>
            <th >${ele.title}</th>
            <td>${ele.desc}</td>
            <td>${ele.due}</td>
            <td>${ele.priority}</td>
            <td><button class="btn btn-primary" onclick="return update(${ele.id})">Edit-Data</button> ||
            <button class="btn btn-danger" onclick="return deleteData(${ele.id})">Delete-Data</button> </td>
        </tr>
        `
    })
}
display();


