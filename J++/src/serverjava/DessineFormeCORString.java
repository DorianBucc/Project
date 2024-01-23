package serverjava;

import java.awt.*;


public class DessineFormeCORString extends  DessineFormeCOR{
    final static String NAME_FIGURE = "text";

    DessineFormeCORString(DessineFormeCOR suivant,Graphics graphics){
        super(suivant,graphics);
    }

    @Override
    protected boolean dessine1(String[] TabReq){
        String name = TabReq[0].trim().toLowerCase();
        if(name.equals(NAME_FIGURE) && 4 == TabReq.length){
            graphics.drawString(
                TabReq[1],
                Integer.parseInt(TabReq[2].trim()),
                Integer.parseInt(TabReq[3].trim()));
            return true;
        }
        return false;
    }

} 
