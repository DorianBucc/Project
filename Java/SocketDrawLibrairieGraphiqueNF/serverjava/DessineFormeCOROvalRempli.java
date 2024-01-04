package serverjava;

import java.awt.*;


public class DessineFormeCOROvalRempli extends  DessineFormeCOR{
    final static String NAME_FIGURE = "cercle";

    DessineFormeCOROvalRempli(DessineFormeCOR suivant,Graphics graphics){
        super(suivant,graphics);
    }

    @Override
    protected boolean dessine1(String[] TabReq){
        String name = TabReq[0].trim().toLowerCase();
        if(name.equals(NAME_FIGURE) && 6 == TabReq.length){
            graphics.fillOval(
                Integer.parseInt(TabReq[1].trim()),
                Integer.parseInt(TabReq[2].trim()),
                Integer.parseInt(TabReq[3].trim()),
                Integer.parseInt(TabReq[4].trim()));
            return true;
        }
        return false;
    }

} 
