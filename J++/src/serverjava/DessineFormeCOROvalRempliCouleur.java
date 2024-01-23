package serverjava;

import java.awt.*;


public class DessineFormeCOROvalRempliCouleur extends  DessineFormeCOR{
    final static String NAME_FIGURE = "cercle";

    DessineFormeCOROvalRempliCouleur(DessineFormeCOR suivant,Graphics graphics){
        super(suivant,graphics);
    }

    @Override
    protected boolean dessine1(String[] TabReq){
        String name = TabReq[0].trim().toLowerCase();
        if(name.equals(NAME_FIGURE) && 14 == TabReq.length && TabReq[13].equals("fill")){
            graphics.setColor(new Color(
                Integer.parseInt(TabReq[5].trim()),
                Integer.parseInt(TabReq[6].trim()),
                Integer.parseInt(TabReq[7].trim()),
                Integer.parseInt(TabReq[8].trim())));
            graphics.fillOval(
                Integer.parseInt(TabReq[1].trim()),
                Integer.parseInt(TabReq[2].trim()),
                Integer.parseInt(TabReq[3].trim()),
                Integer.parseInt(TabReq[4].trim()));
            graphics.setColor(new Color(
                Integer.parseInt(TabReq[9].trim()),
                Integer.parseInt(TabReq[10].trim()),
                Integer.parseInt(TabReq[11].trim()),
                Integer.parseInt(TabReq[12].trim())));
            graphics.drawOval(
                Integer.parseInt(TabReq[1].trim()),
                Integer.parseInt(TabReq[2].trim()),
                Integer.parseInt(TabReq[3].trim()),
                Integer.parseInt(TabReq[4].trim()));
            return true;
        }
        return false;
    }

} 
