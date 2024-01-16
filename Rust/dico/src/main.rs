use rand::Rng;
use std::fs::File;
use std::io::Write;

mod fonction_string;

fn menu() -> String{
    let mut intro: Vec<String> = Vec::new();
    intro.push(String::from("\n********    ***     ******      ******\n***   ***    *     ****        ***  ***\n***   ***    *     ***         ***  ***\n***   ***    *     ****        ***  ***\n********    ***     ******      ******\n"));
    intro.push(String::from("\n=====    ====     ====    ====\n||  ||    ||     ||      ||  ||\n||   ||   ||    ||       ||  ||\n||  ||    ||     ||      ||  ||\n=====    ====     ====    ====\n"));
    intro.push(intro[0].replace("*", "#")); 
    intro.push(intro[0].replace("*", ".")); 
    intro.push(intro[0].replace("*", "+")); 
    intro.push(intro[0].replace("*", "@")); 
    let ramdom:usize = rand::thread_rng().gen_range(0..6);
    let resultat: String = intro[ramdom].clone();
    return resultat;
}

fn main() {
    println!("{}",menu());

    let mut name:  Vec<String> = Vec::new();
    let mut nickname: Vec<String> = Vec::new();
    let mut number: Vec<String> = Vec::new();
    let mut date: Vec<String> = Vec::new();
    
    let data_status = fonction_string::get_data("data.txt",&mut name,&mut nickname, &mut number, &mut date);
    // let cname = name.len();
    // let cnickname = nickname.len();
    // let cnumber = number.len();
    if data_status == 1{
        println!("Success");   
    }
    else if data_status == 2{
        println!("Success : with mistake");
    }
    else
    {
        println!("Echec : File not found (data.txt)");
    }
    fonction_string::find_name(&mut name);
    fonction_string::find_nickname(&mut nickname, &mut name);
    fonction_string::find_number(&mut number);
    fonction_string::find_date(&mut date, &mut number);
    fonction_string::find_name_number(&mut name, &mut number);
    let mut file = File::create("sortie.txt").expect("Erreur : File not create");
    for element in name {
        file.write_all(format!("{}{}",element,"\n").as_bytes()).expect("Erreur ecriture fichier");
    }

}