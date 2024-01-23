package serverjava;

import java.awt.*;


public class DessineFormeCORDroite extends  DessineFormeCOR{
    final static String NAME_FIGURE = "droite";

    DessineFormeCORDroite(DessineFormeCOR suivant,Graphics graphics){
        super(suivant,graphics);
    }

    @Override
    protected boolean dessine1(String[] TabReq){
        String name = TabReq[0].trim().toLowerCase();

        if(name.equals(NAME_FIGURE) && TabReq.length == 5){
            graphics.drawLine(
                Integer.parseInt(TabReq[1].trim()),
                Integer.parseInt(TabReq[2].trim()),
                Integer.parseInt(TabReq[3].trim()),
                Integer.parseInt(TabReq[4].trim()));
            return true;
        }
        return false;
    }

} 
