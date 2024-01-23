package serverjava;

import java.awt.*;


public class DessineFormeCORPolygoneRempliCouleur extends  DessineFormeCOR{
    final static String NAME_FIGURE = "polygone";

    DessineFormeCORPolygoneRempliCouleur(DessineFormeCOR suivant, Graphics graphics){
        super(suivant,graphics);
    }

    @Override
    protected boolean dessine1(String[] TabReq){
        String name = TabReq[0].trim().toLowerCase();
        if(name.equals(NAME_FIGURE) && (Integer.parseInt(TabReq[1].trim())*2)+11 == TabReq.length && "fill".equals(TabReq[TabReq.length-1])){
            Polygon poly = new Polygon();
            for (int i = 0; i < (Integer.parseInt(TabReq[1].trim())*2); i+=2) {
                poly.addPoint(Integer.parseInt(TabReq[i+2].trim()), Integer.parseInt(TabReq[i+3].trim())); 
            }
            graphics.setColor(new Color(
                Integer.parseInt(TabReq[TabReq.length-9].trim()),
                Integer.parseInt(TabReq[TabReq.length-8].trim()),
                Integer.parseInt(TabReq[TabReq.length-7].trim()),
                Integer.parseInt(TabReq[TabReq.length-6].trim())));
            graphics.fillPolygon(poly);
            graphics.setColor(new Color(
                Integer.parseInt(TabReq[TabReq.length-5].trim()),
                Integer.parseInt(TabReq[TabReq.length-4].trim()),
                Integer.parseInt(TabReq[TabReq.length-3].trim()),
                Integer.parseInt(TabReq[TabReq.length-2].trim())));
            graphics.drawPolygon(poly);
            return true;
        }
        return false;
    }

} 
