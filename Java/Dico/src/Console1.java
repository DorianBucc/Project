package src;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Console1 {
    public static void main(String[] args){
        Pass pass = new Pass();
        boolean Start = true;
        String[] Intro = new String[10];
        Intro[0] = "\n********    ***     ******      ******\n***   ***    *     ****        ***  ***\n***   ***    *     ***         ***  ***\n***   ***    *     ****        ***  ***\n********    ***     ******      ******\n";            
        Intro[1] = "\n=====    ====     ====    ====\n||  ||    ||     ||      ||  ||\n||   ||   ||    ||       ||  ||\n||  ||    ||     ||      ||  ||\n=====    ====     ====    ====\n";
        Intro[2] = Intro[0].replace("*", "#");
        Intro[3] = Intro[0].replace("*", ".");
        Intro[4] = Intro[0].replace("*", "+");
        Intro[5] = Intro[0].replace("*", "@");        
        System.out.println(Intro[(int) Math.round(Math.random()*(5))]);
        try {
        while(Start == true){
            menu();
            BufferedReader scan = new BufferedReader(new InputStreamReader(System.in));
            String sc = scan.readLine();
            if(sc.equals("4")){
                System.out.println("Exit");
                System.exit(0);
            }
            else if(sc.equals("1")){
                System.out.println("Lancement");
                pass.FindPasswd();
                System.out.println("Terminer");
            }
            else if(sc.equals("2")){
                pass.setFichierConfig(scan.readLine());
            }
            else if(sc.equals("3")){
                pass.setFichierSortie(scan.readLine());
            }
        }
        } catch (IOException e) {
            e.printStackTrace();  
        }
    }
    public static void menu(){
        System.out.println("\nLancer la recherche : 1");
        System.out.println("Modifier le fichier du jeu de donnee : 2");
        System.out.println("Modifier le nom du fichier des mot de passe : 3");
        System.out.println("Fermer le Programme : 4");
    }
}