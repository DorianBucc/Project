//java -classpath .. serverjava.TestServerDraw
package serverjava;
import java.net.ServerSocket;
import java.net.Socket;

public class TestServerDraw {
    public static void main(String[] args) {

       int portServeur = 1664;
        try {

            ServerSocket server = new ServerSocket(portServeur);
            System.out.println("Server JavaDraw prêt : "+ server);
            int i = 0;
            boolean launch = true;
            while(launch){
                Socket client = server.accept();
                ++i;
                System.out.println("Connection numero "+ i + " réussi");
            
                Interlocuteur interlocuteur = new Interlocuteur(client,i);
                interlocuteur.start();
            }
            server.close();
            
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
