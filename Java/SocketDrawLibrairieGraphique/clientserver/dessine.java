package clientserver;

import java.io.*;
import java.awt.*;
import java.awt.image.BufferStrategy;

public class dessine extends Thread 
{
    Graphics graphics;
    BufferStrategy strategy;
    Frame f1AR;
    String requete;

    public dessine(String requete,Frame frame) throws IOException
    { 
        this.f1AR = frame;
        this.graphics = frame.getGraphics();
        this.strategy = frame.getBufferStrategy();
        this.requete = requete;
    }

    @Override
    public void run()
    {
        try
        {
            if("show".equals(this.requete.trim().toLowerCase()))
            {
                this.strategy.show();
            }
            else
            {
                String[] TabReq = this.requete.split(",");
                
                if("window".equals(TabReq[0].trim().toLowerCase())) 
                    this.Init(TabReq);
                else this.ReadResponse(TabReq);
            }
        }
        catch(Exception e){}
    }
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
        switch (TabReq[0].trim().toLowerCase()) 
        {
            case "droite":
                this.graphics.drawLine
                (
                    Integer.parseInt(TabReq[1].trim()),
                    Integer.parseInt(TabReq[2].trim()),
                    Integer.parseInt(TabReq[3].trim()),
                    Integer.parseInt(TabReq[4].trim())
                );
                
                return true;
            case "rectangle":
                this.graphics.drawRect
                (                   
                    Integer.parseInt(TabReq[1].trim()),
                    Integer.parseInt(TabReq[2].trim()),
                    Integer.parseInt(TabReq[3].trim()),
                    Integer.parseInt(TabReq[4].trim())
                );
                return true;
            case "croix":
                this.graphics.drawLine
                (
                    Integer.parseInt(TabReq[1].trim()),
                    Integer.parseInt(TabReq[2].trim()),
                    Integer.parseInt(TabReq[3].trim()),
                    Integer.parseInt(TabReq[4].trim())
                );
                this.graphics.drawLine
                (
                    Integer.parseInt(TabReq[1].trim()),
                    Integer.parseInt(TabReq[3].trim()),
                    Integer.parseInt(TabReq[4].trim()),
                    Integer.parseInt(TabReq[2].trim())
                );
                return true;
            case "cercle":
                graphics.drawOval
                (
                    Integer.parseInt(TabReq[1].trim()),
                    Integer.parseInt(TabReq[2].trim()),
                    Integer.parseInt(TabReq[3].trim()),
                    Integer.parseInt(TabReq[4].trim())
                );
                return true;
            
            case "text":
                graphics.drawString
                (
                    TabReq[1],
                    Integer.parseInt(TabReq[2].trim()),
                    Integer.parseInt(TabReq[3].trim())
                );
                return true;
            default:
                return false;
        }
    }
}
