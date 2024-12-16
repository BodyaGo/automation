import os
import signal
import subprocess

def stop_flask_servers():
    # Отримати список всіх процесів
    try:
        # Виклик команди ps для отримання процесів Flask
        result = subprocess.run(['ps', '-aux'], stdout=subprocess.PIPE, text=True)
        processes = result.stdout.splitlines()
        
        for process in processes:
            if 'flask' in process:
                # Отримати PID (ідентифікатор процесу) з рядка
                pid = int(process.split()[1])
                print(f'Stopping Flask server with PID: {pid}')
                os.kill(pid, signal.SIGTERM)  # Надіслати сигнал для завершення процесу
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    stop_flask_servers()
