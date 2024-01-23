package serverjava;
import java.awt.Graphics2D;
import java.awt.*;


public class DessineFormeCORDroiteEpaisseur extends  DessineFormeCOR{
    final static String NAME_FIGURE = "droite";

    DessineFormeCORDroiteEpaisseur(DessineFormeCOR suivant,Graphics graphics){
        super(suivant,graphics);
    }

    @Override
    protected boolean dessine1(String[] TabReq){
        String name = TabReq[0].trim().toLowerCase();

        if(name.equals(NAME_FIGURE) && 6 == TabReq.length){
            Graphics2D g2d = (Graphics2D) graphics;
            g2d.setStroke(new BasicStroke(Float.parseFloat(TabReq[5].trim())));
            g2d.drawLine(
                Integer.parseInt(TabReq[1].trim()),
                Integer.parseInt(TabReq[2].trim()),
                Integer.parseInt(TabReq[3].trim()),
                Integer.parseInt(TabReq[4].trim()));
            g2d.setStroke(new BasicStroke(1.0f));
            return true;
            
        }
        return false;
    }

} 
