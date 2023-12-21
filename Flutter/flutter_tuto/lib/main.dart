import 'package:flutter/material.dart';
import 'package:flutter_tuto/modele/Compte.dart';
import 'package:flutter_tuto/vue/home/home.dart';

void main(){
  runApp( Myapp());
}

class Myapp extends StatelessWidget {
  Myapp({super.key});
  Compte compte = Compte("Bleau",100);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Game Store",
      debugShowCheckedModeBanner: false,
      home: HomePage(),
    );
  }
}