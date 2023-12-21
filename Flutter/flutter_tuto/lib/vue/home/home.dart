import 'package:flutter/material.dart';
import 'package:flutter_tuto/modele/Compte.dart';

class HomePage extends StatelessWidget {
  HomePage({super.key});
  Compte compte = Compte("Blaau",100);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0xFF5F67EA),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                color: Colors.blue,
                height: 500,
              ),
              Container(
                color: Colors.red,
                height: 400,
              ),
              Transform(
                transform: Matrix4.identity()..rotateZ(20),
                origin:  const Offset(150, 50),
                child: Image.asset(
                  'assets/images/image1.png',
                  width: 200,
                ),
              )
              
            ],
          ),
        ),
        appBar: AppBar(
          backgroundColor: Colors.red,
          title: Text("data ${compte.toString()}"),
        ),
      );
  }
}