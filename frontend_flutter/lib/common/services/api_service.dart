import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static final String apiUrl = "http://localhost:3000/";

  static Future<List<T>> fetchData<T>(
    String endpoint,
    T Function(Map<String, dynamic>) fromJson,
  ) async {
    final completeUrl = "$apiUrl$endpoint";
    final response = await http.get(Uri.parse(completeUrl));

    if (response.statusCode == 200) {
      final utfDecodedBody = utf8.decode(response.bodyBytes);
      List<dynamic> data = jsonDecode(utfDecodedBody);
      return data.map((json) => fromJson(json)).toList();
    } else {
      throw Exception("Chyba při načítání dat z $completeUrl");
    }
  }
}
