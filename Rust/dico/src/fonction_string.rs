use std::io::BufReader;
use std::io::BufRead;
use std::fs::File;


pub fn get_data(filepath:&str ,name: &mut Vec<String>, nickname: &mut Vec<String>, number: &mut Vec<String>, date: &mut Vec<String>) -> u8{
    let mut result: u8 = 1;

    if let Ok(file) = File::open(&filepath){
        let stream_file: BufReader<File> = BufReader::new(file); 
        for line in stream_file.lines(){
            let t = line.unwrap().clone();
            let temp: Vec<&str> = t.split(":").collect();
            if temp[0].contains("nickname") || temp[0].contains("pseudo"){
                nickname.push(temp[1].to_string());
            }
            else if (temp[0].contains("name")) || temp[0].contains("nom"){
                name.push(temp[1].to_string().to_lowercase());
            }
            else if temp[0].contains("number") || temp[0].contains("nombre"){
                number.push(temp[1].to_string());
            }
            else if temp[0].contains("date"){
                date.push(temp[1].to_string());
            }
            else {
                result = 2;
            }
            // let x = temp;
            // print!("{}-{}\n",x[0],x[1]);
        }
    }
    else {
        return 0;
    }
    return result;
}

pub fn find_name(name: &mut Vec<String>) -> bool{
    
    let mut names: Vec<String> = Vec::new();
    
    for element in &mut *name {

        let str = element.as_str();
        let mut type0 = "".to_string();
        let mut type1 = "".to_string();
        let mut type2 = "".to_string();
        let mut type3 = "".to_string();
        let mut type4 = "".to_string();
        for (i,v) in str.chars().enumerate(){
            if i == 0{
                type0 = format!("{}{}",type0,v.to_uppercase());
            }
            else {
                type0 = format!("{}{}",type0,v);
            }
            if i%2 == 0{
                type1 = format!("{}{}",type1,v.to_uppercase());
                type2 = format!("{}{}",type2,v);
            }
            else {
                type1 = format!("{}{}",type1,v);
                type2 = format!("{}{}",type2,v.to_uppercase());
            }
            type3 = format!("{}{}",type3,v);
            type4 = format!("{}{}",type4,v.to_uppercase());
            names.push(type3.clone());
            names.push(type4.clone());

        } 
        names.push(element.clone().to_lowercase());
        names.push(element.clone().to_uppercase());

        names.push(type0.clone());
        names.push(type1.clone());
        names.push(type2.clone());
    }
    
    for element in names {
        name.push(element.clone());
    }
    

    return true;
}

pub fn find_nickname(nickname: &mut Vec<String>, name: &mut Vec<String>){
    for element in nickname {
        name.push(element.clone());
    }
}

pub fn find_number(number: &mut Vec<String>) -> bool{
    // let TFR = ["un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix"];
    // let TEN = ["one","two","three","four","five","six","seven","eight","nine","ten"];
    let mut numbers: Vec<String> = Vec::new();
    let number1 = number.clone();
    for element in number1 {
        for element2 in &mut *number {
            numbers.push(format!("{}{}",element,element2));
        }
    }
    for element in numbers {
        number.push(element.clone());
    }
    return true;
}

pub fn find_date(date: &mut Vec<String>,number: &mut Vec<String>) -> bool{ 

    let mut dates: Vec<String> = Vec::new();

    for element in date {
        let date_complete = element.clone();
        let temp: Vec<&str>;
        if date_complete.contains("/"){
            temp = date_complete.split("/").collect();
        }
        else if date_complete.contains("-"){
            temp = date_complete.split("-").collect();
        }
        else {
            continue;
        }
        if temp.len() < 2{ continue;}

        dates.push(date_complete.clone());
        dates.push(format!("{}",temp[0]));
        dates.push( format!("{}",temp[1]) );
        dates.push( format!("{}{}",temp[1],temp[0]) );
        if temp.len() > 2{
            dates.push( format!("{}",temp[2]) );
            dates.push( format!("{}{}",temp[2],temp[1]) );
            dates.push( format!("{}{}{}",temp[0],temp[1],temp[2]) );
            dates.push( format!("{}{}{}",temp[2],temp[1],temp[0]) );
        }
    }
    
    for element in dates{
        number.push(element.clone());
    }
    return true;

}


pub fn find_name_number(name: &mut Vec<String>,number: &mut Vec<String>) -> bool{
    
    // let mut file = match File::create("exemple.txt") {
    //     Ok(file) => file,
    //     Err(err) => {
    //         println!("Erreur lors de l'ouverture du fichier : {}", err);
    //         return false;
    //     }
    // };

    let mut names: Vec<String> = Vec::new();
    for num in &mut *number {
        for element in &mut *name {


            let type0 = format!("{}{}",element,num);
            let type1 = format!("{}{}",num,element);
            let type2 = format!("{}{}{}",num,element,num);
            
            names.push(type0.clone());
            names.push(type1.clone());
            names.push(type2.clone());
        }
    }
    for element in number {
        name.push(element.clone());
    }
    for element in names {
        name.push(element.clone());
        // file.write_all(format!("{}{}",element,"\n").as_bytes()).expect("Erreur ecriture fichier");
    }

    return true;
}
