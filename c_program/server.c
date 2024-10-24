#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>
#include <ws2tcpip.h>

#pragma comment(lib, "ws2_32.lib")  // Link Winsock library

#define PORT 8080
#define BUFFER_SIZE 1024
#define RESPONSE "Hello from Server!"

int main() {
    WSADATA wsaData;
    SOCKET server_fd, new_socket;
    struct sockaddr_in address;
    int opt = 1;
    int addrlen = sizeof(address);
    char buffer[BUFFER_SIZE] = {0};

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        printf("WSAStartup failed: %d\n", WSAGetLastError());
        return 1;
    }

    // Create socket
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
        printf("Socket failed: %d\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }

    // Set socket options
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, (char *)&opt, sizeof(opt)) < 0) {
        printf("Setsockopt failed: %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    // Bind the socket to the port
    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        printf("Bind failed: %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    // Listen for incoming connections
    if (listen(server_fd, 3) < 0) {
        printf("Listen failed: %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    printf("Server is running, waiting for connections...\n");

    // Accept a connection from a client
    if ((new_socket = accept(server_fd, (struct sockaddr *)&address, &addrlen)) == INVALID_SOCKET) {
        printf("Accept failed: %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    printf("Connection accepted from %s:%d\n", inet_ntoa(address.sin_addr), ntohs(address.sin_port));

    // Infinite loop to handle client communication
    while (1) {
        // Read data sent by the client
        int bytes_read = recv(new_socket, buffer, BUFFER_SIZE, 0);
        if (bytes_read < 0) {
            printf("Read failed: %d\n", WSAGetLastError());
            break;
        } else if (bytes_read == 0) {
            printf("Client disconnected.\n");
            break;
        }

        buffer[bytes_read] = '\0';
        printf("Received message: %s\n", buffer);

        // Check if the client wants to disconnect
        if (strncmp(buffer, "N", 1) == 0) {
            printf("Client requested to disconnect.\n");
            break;
        }

        // Send a response back to the client
        if (send(new_socket, RESPONSE, strlen(RESPONSE), 0) < 0) {
            printf("Send failed: %d\n", WSAGetLastError());
        } else {
            printf("Response sent to client.\n");
        }
    }

    // Close the client socket
    closesocket(new_socket);
    printf("Connection closed with client.\n");

    // Close the server socket
    closesocket(server_fd);
    WSACleanup();
    return 0;
}
