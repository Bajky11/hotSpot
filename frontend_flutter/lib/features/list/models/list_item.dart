class ListItemDto {
  final String id;
  final String name;

  ListItemDto({required this.id, required this.name});

  factory ListItemDto.fromJson(Map<String, dynamic> json) {
    return ListItemDto(id: json["id"] as String, name: json["name"] as String);
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'name': name};
  }
}
