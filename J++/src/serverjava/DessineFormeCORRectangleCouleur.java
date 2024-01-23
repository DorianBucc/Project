package serverjava;

import java.awt.*;


public class DessineFormeCORRectangleCouleur extends  DessineFormeCOR{
    final static String NAME_FIGURE = "rectangle";

    DessineFormeCORRectangleCouleur(DessineFormeCOR suivant, Graphics graphics){
        super(suivant,graphics);
    }

    @Override
    protected boolean dessine1(String[] TabReq){
        String name = TabReq[0].trim().toLowerCase();
        if(name.equals(NAME_FIGURE) && 9 == TabReq.length){
            graphics.setColor(new Color(
                Integer.parseInt(TabReq[5].trim()),
                Integer.parseInt(TabReq[6].trim()),
                Integer.parseInt(TabReq[7].trim()),
                Integer.parseInt(TabReq[8].trim())));
            graphics.drawRect(
                Integer.parseInt(TabReq[1].trim()),
                Integer.parseInt(TabReq[2].trim()),
                Integer.parseInt(TabReq[3].trim()),
                Integer.parseInt(TabReq[4].trim()));
            return true;
        }
        return false;
    }

} 
