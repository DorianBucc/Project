package serverjava;

import java.awt.*;


public class DessineFormeCORPolygone extends  DessineFormeCOR{
    final static String NAME_FIGURE = "polygone";

    DessineFormeCORPolygone(DessineFormeCOR suivant, Graphics graphics){
        super(suivant,graphics);
    }

    @Override
    protected boolean dessine1(String[] TabReq){
        String name = TabReq[0].trim().toLowerCase();
        if(name.equals(NAME_FIGURE) && (Integer.parseInt(TabReq[1].trim())*2)+2 == TabReq.length){
            Polygon poly = new Polygon();
            for (int i = 0; i < Integer.parseInt(TabReq[1].trim())*2; i+=2) {
                poly.addPoint(Integer.parseInt(TabReq[i+2].trim()), Integer.parseInt(TabReq[i+3].trim())); 
            }
            graphics.drawPolygon(poly);
            return true;
        }
        return false;
    }

} 
