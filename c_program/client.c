#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <time.h>

#pragma comment(lib, "ws2_32.lib")  // Link Winsock library

#define PORT 8080
#define SERVER_IP "127.0.0.1"
#define MESSAGE "Hello, Server!"
#define BUFFER_SIZE 1024
#define MAX_RETRIES 5
#define RETRY_DELAY 2

double time_to_fast_km(double time_in_seconds) {
    return time_in_seconds / 0.0001;
}

void display_ist() {
    time_t currentTime;
    struct tm *utcTime, istTime;

    time(&currentTime);
    utcTime = gmtime(&currentTime);

    istTime = *utcTime;
    istTime.tm_hour += 5;
    istTime.tm_min += 30;

    if (istTime.tm_min >= 60) {
        istTime.tm_min -= 60;
        istTime.tm_hour += 1;
    }
    if (istTime.tm_hour >= 24) {
        istTime.tm_hour -= 24;
        istTime.tm_mday += 1;
    }

    printf("Current IST time: %02d:%02d:%02d\n",
           istTime.tm_hour,
           istTime.tm_min,
           istTime.tm_sec);
}

int main() {
    WSADATA wsaData;
    SOCKET sock;
    struct sockaddr_in serv_addr;
    char buffer[BUFFER_SIZE] = {0};
    FILE *f;
    char user_input;
    double total_distance = 0.0;

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        printf("WSAStartup failed: %d\n", WSAGetLastError());
        return EXIT_FAILURE;
    }

    // Create socket
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
        printf("Socket creation error: %d\n", WSAGetLastError());
        WSACleanup();
        return EXIT_FAILURE;
    }

    memset(&serv_addr, 0, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);

    if (inet_pton(AF_INET, SERVER_IP, &serv_addr.sin_addr) <= 0) {
        printf("Invalid address / Address not supported\n");
        closesocket(sock);
        WSACleanup();
        return EXIT_FAILURE;
    }

    // Attempt to connect with retries
    int retries = 0;
    while (retries < MAX_RETRIES) {
        if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) {
            printf("Connection refused. Retrying in %d seconds... (Attempt %d/%d)\n", 
                   RETRY_DELAY, retries + 1, MAX_RETRIES);
            Sleep(RETRY_DELAY * 1000);  // Use Sleep() instead of sleep() on Windows
            retries++;
        } else {
            printf("Connected to server at %s:%d.\n", SERVER_IP, PORT);
            break;
        }
    }

    if (retries == MAX_RETRIES) {
        fprintf(stderr, "Failed to connect after %d attempts. Is the server running?\n", MAX_RETRIES);
        closesocket(sock);
        WSACleanup();
        return EXIT_FAILURE;
    }

    f = fopen("fast_km_data.txt", "a");
    if (f == NULL) {
        perror("Failed to open fast_km_data.txt");
        closesocket(sock);
        WSACleanup();
        return EXIT_FAILURE;
    }

    double previous_time_taken = 0.0;
    struct timespec start, end;

    // Main loop asking the user if they want to continue
    do {
        // Display IST time
        display_ist();

        clock_gettime(CLOCK_MONOTONIC, &start);

        if (send(sock, MESSAGE, strlen(MESSAGE), 0) < 0) {
            printf("Send failed: %d\n", WSAGetLastError());
            break;
        }

        ssize_t bytes_read = recv(sock, buffer, BUFFER_SIZE - 1, 0);
        if (bytes_read < 0) {
            printf("Receive failed: %d\n", WSAGetLastError());
            break;
        } else if (bytes_read == 0) {
            printf("Server closed the connection\n");
            break;
        }

        buffer[bytes_read] = '\0';
        printf("Server response: %s\n", buffer);

        clock_gettime(CLOCK_MONOTONIC, &end);

        double time_taken = (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;
        double fast_km = time_to_fast_km(time_taken);
        printf("Time taken: %.6f seconds (%.2f fast kilometers)\n", time_taken, fast_km);

        fprintf(f, "%.2f\n", fast_km);

        // Accumulate total distance
        total_distance += fast_km;

        if (previous_time_taken > 0) {
            double time_difference = time_taken - previous_time_taken;
            double time_diff_fast_km = time_to_fast_km(time_difference);
            printf("Time difference from previous: %.6f seconds (%.2f fast kilometers)\n",
                   time_difference, time_diff_fast_km);
        }
        previous_time_taken = time_taken;

        printf("Total fast kilometers covered: %.2f\n", total_distance);

        printf("Do you want to continue? (Y/N): ");
        scanf(" %c", &user_input);
    } while (user_input == 'Y' || user_input == 'y');

    fclose(f);
    closesocket(sock);
    WSACleanup();
    return EXIT_SUCCESS;
}
