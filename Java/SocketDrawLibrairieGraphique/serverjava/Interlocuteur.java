package serverjava;

import java.io.*;
import java.net.Socket;
import java.awt.*;
import java.awt.image.BufferStrategy;
public class Interlocuteur extends Thread 
{
    PrintStream fluxSortant;
    BufferedReader fluxEntrant;
    Graphics graphics;
    BufferStrategy strategy;
    int i;
    Frame f1AR;

    public Interlocuteur(Socket client, int i) throws IOException
    { 
        this.f1AR = new Frame("Page"+i);
        this.f1AR.setSize(400,400);
        this.f1AR.setLocationRelativeTo(null);
        this.f1AR.setIgnoreRepaint(true);
        //parti socket
        //this.fluxSortant = new PrintStream(client.getOutputStream());
        this.fluxEntrant = new BufferedReader(new InputStreamReader(client.getInputStream()));
        this.i = i;
    }

    @Override
    public void run()
    {
        try
        {   
            while(!Thread.interrupted())
            {
                String requete = fluxEntrant.readLine();
                
                System.out.println("Le clientb n°" + i + ", Requete = " + requete);
                dessine th = new dessine(requete, this.f1AR);
                th.start();
            }
            this.graphics.dispose();
            
        }
        catch(Exception e){}
    }
}
