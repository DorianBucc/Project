package serverjava;

import java.awt.*;


public class DessineFormeCORRectangleRempli extends  DessineFormeCOR{
    final static String NAME_FIGURE = "rectangle";

    DessineFormeCORRectangleRempli(DessineFormeCOR suivant,Graphics graphics){
        super(suivant,graphics);
    }

    @Override
    protected boolean dessine1(String[] TabReq){
        String name = TabReq[0].trim().toLowerCase();
        if(name.equals(NAME_FIGURE) && 6 == TabReq.length && TabReq[5].equals("fill")){
            graphics.fillRect(
                Integer.parseInt(TabReq[1].trim()),
                Integer.parseInt(TabReq[2].trim()),
                Integer.parseInt(TabReq[3].trim()),
                Integer.parseInt(TabReq[4].trim()));
            return true;
        }
        return false;
    }

} 
