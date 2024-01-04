package serverjava;

import java.io.*;
import java.awt.*;
import java.awt.image.BufferStrategy;

public class dessine extends Thread 
{
    Graphics graphics;
    BufferStrategy strategy;
    Frame f1AR;
    String requete;
    DessineFormeCOR dessineCOR = null;

    public dessine(String requete,Frame frame) throws IOException
    { 
        this.f1AR = frame;
        this.graphics = frame.getGraphics();
        this.strategy = frame.getBufferStrategy();
        this.requete = requete;
        
        DessineFormeCOR forme = new DessineFormeCORDroite(null, graphics);
        forme = new DessineFormeCORDroiteEpaisseur(forme, graphics);
        forme = new DessineFormeCOROval(forme, graphics);
        forme = new DessineFormeCOROvalRempli(forme, graphics);
        forme = new DessineFormeCORRectangle(forme, graphics);
        forme = new DessineFormeCORRectangleRempli(forme, graphics);
        forme = new DessineFormeCORString(forme, graphics);
        this.dessineCOR = forme;
    }

    @Override
    public void run()
    {
        try
        {
            if("show".equals(this.requete.trim()))
            {
                this.strategy.show();
            }
            else
            {
                String[] TabReq = this.requete.split(",");
                
                if("window".equals(TabReq[0].trim())) 
                    this.Init(TabReq);
                else this.ReadResponse(TabReq);
            }
        }
        catch(Exception e){}
    }
    //--------------
    public void Init(String[] TabReq){
        try {
            this.f1AR.setTitle(TabReq[3].trim());
            this.f1AR.setSize(Integer.parseInt(TabReq[1]),Integer.parseInt(TabReq[2]));
            this.f1AR.setVisible(true);
            this.f1AR.setResizable(false);
            int numBuffers = 2;
            this.f1AR.createBufferStrategy(numBuffers);
            Thread.sleep(150);
            this.strategy = this.f1AR.getBufferStrategy();
            this.graphics = this.strategy.getDrawGraphics();
            return;
        } catch (Exception e) {}
    }
    public boolean ReadResponse(String[] TabReq)
    {
        return this.dessineCOR.dessine(TabReq);
    }
}
