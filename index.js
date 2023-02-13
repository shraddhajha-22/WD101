let userForm = document.getElementById("user-form");
var UserEnteries = [];

let errors =[];
const enteredEntries = () =>{
    let entries = localStorage.getItem("UserEntries");
    if (entries){
      entries =JSON.parse(entries);
    } else {
      entries =[];
    }
    return entries;
};
const displayEnteries = () => {
    let entries = enteredEntries();
    const tbleEntries = entries.map((entry) => {

        const nameCell = `<td class ='border px-5 py-2'>${entry.name}</td>`;
        const emailCell = `<td class ='border px-5 py-2'>${entry.email}</td>`;
        const passwordCell =`<td class ='border px-5 py-2'>${entry.password}</td>`;
        const dobCell =`<td class='border px-5 py-2'>${entry.dob}</td>`;
        const acceptTermsCell =`<td class ='border px-5 py-2'>${entry.acceptTerms}</td>`;
        const row =`<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }) 
    .join("/n");
  const table =`<table class='table-auto w-full'>
    <tr>
    <th class='px-4 py-2 '>Name </th>
    <th class='px-4 py-2 '>Email </th>
    <th class='px-4 py-2 '>Password </th>
    <th class='px-4 py-2 '>Dob </th>
    <th class='px-4 py-2 '>Accepted Terms? </th>
    </tr>${tbleEntries}
</table>`;
  let details =document.getElementById("user-enteries");
  details.innerHTML =table;
};

const saveUserForm = (event) =>{
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password =document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms =document.getElementById("acceptTerms").Checked;
    var currentYear = new Date().getFullYear();
    var birthYear =dob.split("-");
    let year = birthYear[0];
    var age = currentYear - year;
    console.log({age, currentYear ,birthYear});
    if (age <18 || age >55){
        document.getElementById("dob").style ="border:1px solid red";
        return alert("your age must be under 18 and 55 years");
    }else{
        document.getElementById("dob").style ="border:none";
        
        const entry ={
            name,
            email,
            password,
            dob,
            acceptTerms,
        };
        UserEnteries =enteredEntries();
        UserEnteries.push(entry);
        localStorage.setItem("userEntries",JSON.stringify(UserEnteries));
        displayEnteries();
        userForm.reset();
    }
};
userForm.addEventListener("submit",saveUserForm);
displayEnteries();