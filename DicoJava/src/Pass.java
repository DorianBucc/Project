package src;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Stack;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;

public class Pass {
      
    private int complexe = 11;           //structuration des passwd
    private int NombreComplexe = 100;    //nombre pouvant etre écrit en lettre
    private int LongPrefixe = 5;         //longueur des acronyme de mot exemple visual avec 4 : vi, vis, visu
    private int lang = 2;                //variable pour le choix des langue All=0 En=1 Fr=2
    private int TabTaille = 0;
    private List<String> LiNom;         //liste des noms
    private List<String> LiNombre;      //liste des nombre : 2 ou deux
    private List<String> LiPseudo;      //liste des pseudo : FYnD ne sera pas modifier (!= fynd) (nom != pseudo)
    private String fichierSortie = ".\\resultat.txt";
    private String fichierConfig = ".\\data.txt";

    public void FindPasswd(){
        try{     //fonction try catch pour que la fonction de l'ouverture du fichier fonctionne

            String[] TabInfo = new String[50];
            String[] TypeInfo = new String[50];
            
            Scanner scanner = new Scanner(new FileInputStream(this.fichierConfig));  // Le fichier d'entrée 
            int taille = 0;
            while(scanner.hasNextLine()){    //renvoie true s'il y a une autre ligne à lire
                String[] tab = scanner.nextLine().split(":");
                TabInfo[taille] = tab[0];
                TypeInfo[taille] = tab[1];
                // System.out.println(tab[1]);
                taille++;
            }
            scanner.close();
            this.TabTaille = taille;

            String Passwd = "";         //variable de stockage des string pour les passwd
            this.LiNom = this.findNom(TabInfo, TypeInfo);       //enregistre le liste des nom dans la variable de liste
            this.LiNombre = this.findNombre(TabInfo, TypeInfo); //enregistre le liste des nombre dans la variable de liste
            this.LiPseudo = this.findPseudo(TabInfo, TypeInfo); //enregistre le liste des pseudo dans la variable de liste
            this.findDate(TabInfo, TypeInfo);                   //enregistre les date dans different format dans la liste de nombre
            PrintWriter file = new PrintWriter(new BufferedWriter(new FileWriter(this.fichierSortie))); //ouverture du fichier ou création

            for(int i=0;i<LiNombre.size();i++){                 //boucle pour les nombre entre les nombre
                Passwd += LiNombre.get(i) + "\n";               //nombre seul
                    for(int y=0;y<LiNombre.size();y++){
                    Passwd += LiNombre.get(i) + LiNombre.get(y) + "\n";                         //nombre + un nombre derrière
                    if(this.complexe > 5){                                                      //verification du niveau de structuration complexe
                        Passwd += LiNombre.get(y) + LiNombre.get(i) + "\n";                     // nombre devant + le nombre
                        Passwd += LiNombre.get(y) + LiNombre.get(i) + LiNombre.get(y) + "\n";   // nombre devant et derriere le nombre
                    }
                }
                file.print(Passwd);     //ecriture du contenu de la string dans le fichier .txt
                Passwd = "";            //nettoyage de la string
            }
            for(int i=0;i<LiNom.size();i++){                    //boucle pour les nom avec les nombre
                Passwd += LiNom.get(i) + "\n";                  //nom seul
                for(int y=0;y<LiNombre.size();y++){
                    Passwd += LiNom.get(i) + LiNombre.get(y) + "\n";       //nom + un nombre derrière
                    if(this.complexe > 5){                                 //verification du niveau de structuration complexe
                        Passwd += LiNombre.get(y) + LiNom.get(i) + "\n";    // nombre devant + le nom
                        Passwd += LiNombre.get(y) + LiNom.get(i) + LiNombre.get(y) + "\n";  // nombre devant et derriere le nom
                    }
                }
                file.print(Passwd);     //ecriture du contenu de la string dans le fichier .txt
                Passwd = "";            //nettoyage de la string
            }
            for(int i=0;i<LiPseudo.size();i++){                 //boucle pour les pseudo avec les nombre
                Passwd += LiPseudo.get(i) + "\n";               //pseudo seul
                for(int y=0;y<LiNombre.size();y++){
                    Passwd += LiPseudo.get(i) + LiNombre.get(y) + "\n";     //pseudo + un nombre derrière
                    if(this.complexe > 5){                                  //verification du niveau de structuration complexe
                        Passwd += LiNombre.get(y) + LiPseudo.get(i) + "\n"; // nombre devant + le pseudo
                        Passwd += LiNombre.get(y) + LiPseudo.get(i) + LiNombre.get(y) + "\n";   // nombre devant et derriere le pseudo
                    }
                }
                file.print(Passwd);     //ecriture du contenu de la string dans le fichier .txt
                Passwd = "";            //nettoyage de la string
            }
            file.close();       //fermeture du fichier .txt
        }
        catch (IOException e) {  //catch pour la gestion d'erreur de type IOException (pour la fonction de l'ouverture de fichier)
            e.printStackTrace();   
        }
        return ;
    }
       
    private void findDate(String[] TabInfo, String[] TypeInfo){
        List<String> Lidate = new Stack<String>();      //variable pour stocker les strings temporairement
        for(int i=0;i<this.TabTaille;i++){  //boucle pour chercher les date dans le tabInfo
            if(TypeInfo[i].equals("date")){
                Lidate.add(TabInfo[i]);
            }
        }
        for (String s : Lidate) {   //boucle pour traiter les date sous diffèrent format
            String[] t = s.split("/");  // separation des morceaux de la date par les "/"
            this.LiNombre.add(s);
            this.LiNombre.add(t[0]);    
            if(this.lang == 0 || this.lang == 2)this.LiNombre.add(IntLettreFr(Integer.parseInt(t[0])));
            if(this.lang == 0 || this.lang == 2)this.LiNombre.add(IntLettreFr(Integer.parseInt(t[0])).toLowerCase());
            if(this.lang == 0 || this.lang == 1)this.LiNombre.add(IntLettreEn(Integer.parseInt(t[0])));
            if(this.lang == 0 || this.lang == 1)this.LiNombre.add(IntLettreEn(Integer.parseInt(t[0])).toLowerCase());
            this.LiNombre.add(t[1]);
            if(this.lang == 0 || this.lang == 2)this.LiNombre.add(IntLettreFr(Integer.parseInt(t[1])));
            if(this.lang == 0 || this.lang == 2)this.LiNombre.add(IntLettreFr(Integer.parseInt(t[1])).toLowerCase());
            if(this.lang == 0 || this.lang == 1)this.LiNombre.add(IntLettreEn(Integer.parseInt(t[1])));
            if(this.lang == 0 || this.lang == 1)this.LiNombre.add(IntLettreEn(Integer.parseInt(t[1])).toLowerCase());
            this.LiNombre.add(t[2]);
            this.LiNombre.add(t[2].substring(2, 4));
            if(this.lang == 0 || this.lang == 2)this.LiNombre.add(IntLettreFr(Integer.parseInt(t[2].substring(2, 4))));
            if(this.lang == 0 || this.lang == 2)this.LiNombre.add(IntLettreFr(Integer.parseInt(t[2].substring(2, 4))).toLowerCase());
            if(this.lang == 0 || this.lang == 1)this.LiNombre.add(IntLettreEn(Integer.parseInt(t[2].substring(2, 4))));
            if(this.lang == 0 || this.lang == 1)this.LiNombre.add(IntLettreEn(Integer.parseInt(t[2].substring(2, 4))).toLowerCase());

            this.LiNombre.add(t[0]+t[1]);
            this.LiNombre.add(t[0]+"-"+t[1]);
            this.LiNombre.add(t[0]+t[1]+t[2].substring(2, 4));
            this.LiNombre.add(t[0]+"-"+t[1]+"-"+t[2].substring(2, 4));
            this.LiNombre.add(t[0]+t[1]+t[2]);
            this.LiNombre.add(t[0]+"-"+t[1]+"-"+t[2]);

            this.LiNombre.add(t[2]+t[1]+t[0]);
            this.LiNombre.add(t[2]+"-"+t[1]+"-"+t[0]);
        }
        return;

    }

    private List<String> findPseudo(String[] TabInfo, String[] TypeInfo){
        List<String> LiPseudo = new Stack<String>();
        for(int i=0;i<this.TabTaille;i++){
            if(TypeInfo[i].equals("pseudo")){
                LiPseudo.add(TabInfo[i]);
            }
        }
        return LiPseudo;
    }

    private List<String> findNom(String[] TabInfo, String[] TypeInfo){
        List<String> LiNom = new Stack<String>();
        for(int i=0;i<this.TabTaille;i++){
            if(TypeInfo[i].equals("nom")){
                LiNom.add(TabInfo[i].toLowerCase());
            }
        }
        LiNom = findAllString(LiNom);
        return LiNom;

    }
    
    private List<String> findNombre(String[] TabInfo, String[] TypeInfo){
        List<String> LiNombre = new Stack<String>();
        for(int i=0;i<this.TabTaille;i++){
            if(TypeInfo[i].equals("nombre")){
                LiNombre.add(TabInfo[i]);
                if(Integer.parseInt(TabInfo[i]) < this.NombreComplexe){
                    if(this.lang == 0 || this.lang == 2)LiNombre.add(IntLettreFr(Integer.parseInt(TabInfo[i])));
                    if(this.lang == 0 || this.lang == 2)LiNombre.add(IntLettreFr(Integer.parseInt(TabInfo[i])).toLowerCase());
                    if(this.lang == 0 || this.lang == 1)LiNombre.add(IntLettreEn(Integer.parseInt(TabInfo[i])));
                    if(this.lang == 0 || this.lang == 1)LiNombre.add(IntLettreEn(Integer.parseInt(TabInfo[i])).toLowerCase());
                }
            }
        }
        return LiNombre;
    }
    
    private List<String> findAllString(List<String> Li){
        List<String> Liold = new ArrayList<String>(Li);
        for (String s : Liold) {
            Li.add(s.toUpperCase());    //nom en majuscule
            Li.add(s.substring(0, 1).toUpperCase()+s.substring(1, s.length()));     //nom avec majuscule à l'avant
            Li.add(s.substring(0, 1).toUpperCase()+s.substring(1, s.length()-1));   //nom avec majuscule à l'avant et la dernier lettre supprimer
            for(int d=2;d<this.LongPrefixe+1;d++){
                String prefixe = s.substring(0, d);            
                Li.add(prefixe);
                Li.add(prefixe+prefixe);
                prefixe = prefixe.substring(0, 1).toUpperCase() + prefixe.substring(1, d);
                Li.add(prefixe);
                Li.add(prefixe+prefixe);
                prefixe = prefixe.toUpperCase();
                Li.add(prefixe);
                Li.add(prefixe+prefixe);
            }
            String ss = "";
            String sss = "";
            for(int d=0;d<s.length();d++){
                if(d%2 == 1){ss+=s.substring(d,d+1).toUpperCase();}
                else ss+= s.charAt(d);
                
                if(d%2 == 0){sss+=s.substring(d,d+1).toUpperCase();}
                else sss+= s.charAt(d);
            }
            Li.add(ss);
            Li.add(sss);
        }
        return Li;
    }
    
    private String IntLettreFr(int nombre){
        String Res = "";
        boolean start = false;
        for(int i = this.NombreComplexe; i>=10; i/=10){
            if(nombre/i > 0){start = true;}
            if(start == true){
                switch (nombre/i) {
                    case 1:
                        Res+= "Un";
                        break;
                    case 2:
                        Res+= "Deux";
                        break;
                    case 3:
                        Res+= "Trois";
                        break;
                    case 4:
                        Res+= "Quatre";
                        break;
                    case 5:
                        Res+= "Cinq";
                        break;
                    case 6:
                        Res+= "Six";
                        break;
                    case 7:
                        Res+= "Sept";
                        break;
                    case 8:
                        Res+= "Huit";
                        break;
                    case 9:
                        Res+= "Neuf";
                        break;
                    default:
                        Res+= "Zero";
                        break;
                }
            }
        }
        switch (nombre%10) {
            case 1:
                Res+= "Un";
                break;
            case 2:
                Res+= "Deux";
                break;
            case 3:
                Res+= "Trois";
                break;
            case 4:
                Res+= "Quatre";
                break;
            case 5:
                Res+= "Cinq";
                break;
            case 6:
                Res+= "Six";
                break;
            case 7:
                Res+= "Sept";
                break;
            case 8:
                Res+= "Huit";
                break;
            case 9:
                Res+= "Neuf";
                break;
            default:
                Res+= "Zero";
                break;
        }
        return Res;
    }
    private String IntLettreEn(int nombre){
        String Res = "";
        boolean start = false;
        for(int i = this.NombreComplexe; i>=10; i/=10){
            if(nombre/i > 0){start = true;}
            if(start == true){
                switch (nombre/i) {
                    case 1:
                        Res+= "One";
                        break;
                    case 2:
                        Res+= "Two";
                        break;
                    case 3:
                        Res+= "Three";
                        break;
                    case 4:
                        Res+= "Four";
                        break;
                    case 5:
                        Res+= "Five";
                        break;
                    case 6:
                        Res+= "Six";
                        break;
                    case 7:
                        Res+= "Seven";
                        break;
                    case 8:
                        Res+= "Eight";
                        break;
                    case 9:
                        Res+= "Nine";
                        break;
                    default:
                        Res+= "Zero";
                        break;
                }
            }
        }
        switch (nombre%10) {
            case 1:
                Res+= "One";
                break;
            case 2:
                Res+= "Two";
                break;
            case 3:
                Res+= "Three";
                break;
            case 4:
                Res+= "Four";
                break;
            case 5:
                Res+= "Five";
                break;
            case 6:
                Res+= "Six";
                break;
            case 7:
                Res+= "Seven";
                break;
            case 8:
                Res+= "Eight";
                break;
            case 9:
                Res+= "Nine";
                break;
            default:
                Res+= "Zero";
                break;
        }
        return Res;
    }
    public void setFichierConfig(String s){
        this.fichierConfig = s;
        if(!s.contains(".")){
            this.fichierConfig += ".txt";
        }
        if(!s.contains("/")){
            this.fichierConfig = ".\\" + this.fichierConfig;
        }
        if(s.contains("/")){
            this.fichierConfig.replace("/","\\");
        }
    }
    public void setFichierSortie(String s){
        this.fichierSortie = s;
        if(!s.contains(".")){
            this.fichierSortie += ".txt";
        }
        if(!s.contains("/")){
            this.fichierSortie = ".\\" + this.fichierSortie;
        }
        if(s.contains("/")){
            this.fichierSortie.replace("/","\\");
        }
    }
}
