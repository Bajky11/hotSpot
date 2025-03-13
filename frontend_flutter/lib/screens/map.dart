import 'package:before_leaving/features/app_bar/widgets/custom_app_bar.dart';
import 'package:before_leaving/features/bottom_navigation_bar/widgets/custom_bottom_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/plugin_api.dart';
import 'package:latlong2/latlong.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  List<Marker> markers = [];

  @override
  void initState() {
    super.initState();
    fetchLocations();
  }

Future<void> fetchLocations() async {
  final response = await http.get(Uri.parse('http://localhost:8080/hotSpot/api/location'));

  if (response.statusCode == 200) {
    List<dynamic> data = json.decode(response.body);
    setState(() {
      markers = data.map((location) {
        return Marker(
          width: 50.0,
          height: 50.0,
          point: LatLng(location['latitude'], location['longitude']),
          builder: (ctx) => GestureDetector(
            onTap: () {
              print("Kliknuto na: ${location['name']}");
            },
            child: Container(
              decoration: BoxDecoration(
                color: Colors.blue,
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white, width: 2),
              ),
              child: const Center(
                child: Icon(Icons.place, color: Colors.white, size: 30),
              ),
            ),
          ),
        );
      }).toList();
    });
  } else {
    throw Exception('Nepodařilo se načíst lokační body');
  }
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlutterMap(
        options: MapOptions(
          center: LatLng(50.0375, 15.7792), // Pardubice jako výchozí bod
          zoom: 13.0,
          minZoom: 5.0,
          maxZoom: 18.0,
        ),
        children: [
          TileLayer(
            urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            subdomains: ['a', 'b', 'c'],
          ),
          MarkerLayer(markers: markers),
        ],
      ),
    
      bottomNavigationBar: CustomBottomNaviagtionBar(),
      appBar: CustomAppBar(text: "Map"),
    );
  }
}
