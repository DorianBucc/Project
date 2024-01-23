package serverjava;

import java.awt.*;


public abstract class DessineFormeCOR implements  DessineForme{
    Graphics graphics;
    DessineFormeCOR suivant;

    DessineFormeCOR(DessineFormeCOR suivant,Graphics graphics){
        super();
        this.suivant = suivant;
        this.graphics = graphics;
    }

    @Override
    public boolean dessine(String[] TabReq){
        boolean result = this.dessine1(TabReq);
        if(result){
            return true;
        }
        else{
            if(this.suivant != null){
                return this.suivant.dessine(TabReq);
            }
            else{
                return false;
            }
        }
    }

    abstract protected boolean dessine1(String[] TabReq);

} 
